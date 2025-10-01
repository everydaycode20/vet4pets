import { useEffect, useState } from "react";
import { boolean, number, object, string } from "zod";
import Appearance from "./appearance";
import GeneralSettings from "./general";
import Preferences from "./preferences";
import { SubmitHandler, useForm } from "react-hook-form";
import ISettings from "../../models/settings.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitBtn from "../../components/submit-btn/submit-btn";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiUrl } from "../../constants/apiUrl";
import Toast from "../../components/toast/toast";
import { MakeSettingsJsonPatchRequest } from "../../utils/json-patch-req";

const schema = object({
  timeFormat: string({ message: "Select a time format" }),
  dateFormat: string({ message: "Select a date format" }),
  language: object(
    { id: number(), name: string(), isoCode: string() },
    { message: "select a language" }
  ),
  appearance: object(
    { id: number(), name: string() },
    { message: "select an appearance" }
  ),
  reduceMotion: boolean(),
  appointmentLength: number(),
  workingHoursStart: string(),
  workingHoursEnd: string(),
});

export default function Settings() {
  const [open, setOpen] = useState(false);

  const [openSuccessToast, setSuccessToast] = useState(false);

  const onSubmit: SubmitHandler<ISettings> = (data) => {
    if (
      Object.keys(dirtyFields).length > 0 &&
      Object.keys(touchedFields).length
    ) {
      updateSettings.mutate(data);
    } else {
      setOpen(true);
    }
  };

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isDirty, dirtyFields, touchedFields },
  } = useForm<ISettings>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  const settings = useQuery({
    queryKey: ["settings"],
    queryFn: async (): Promise<ISettings[]> => {
      //TODO: should not be hardcoded
      const res = await fetch(`${apiUrl}/settings?id=2`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      return res.json();
    },
  });

  const updateSettings = useMutation({
    mutationFn: async (data: ISettings) => {
      const res = await fetch(`${apiUrl}/settings/2`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify(MakeSettingsJsonPatchRequest(data, dirtyFields)),
      });

      return await res.json();
    },
    onSuccess: () => {
      // settings.refetch();

      setSuccessToast(true);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (settings.data) {
      const {
        appearance,
        appointmentLength,
        dateFormat,
        language,
        reduceMotion,
        timeFormat,
        workingHoursEnd,
        workingHoursStart,
      } = settings.data[0];

      setValue("appearance", appearance);
      setValue("appointmentLength", appointmentLength);
      setValue("dateFormat", dateFormat?.toUpperCase());
      setValue("language", language);
      setValue("reduceMotion", reduceMotion);
      setValue("timeFormat", timeFormat);
      setValue("workingHoursEnd", workingHoursEnd);
      setValue("workingHoursStart", workingHoursStart);
    }
  }, [settings.data]);

  return (
    <div className="h-full bg-white p-[24px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-[12px]"
      >
        {settings.data && (
          <GeneralSettings control={control} getValues={getValues} />
        )}

        <Appearance control={control} />

        {settings.data && (
          <Preferences control={control} getValues={getValues} />
        )}

        <div className="mt-[12px]">
          <SubmitBtn text="Save settings" classes="" />
        </div>
      </form>

      <Toast
        title="Everything is up to date"
        description="No changes to save"
        type="warning"
        open={open}
        setOpen={setOpen}
      />

      <Toast
        title="Settings saved"
        description="All changes applied"
        type="success"
        open={openSuccessToast}
        setOpen={setSuccessToast}
      />
    </div>
  );
}
