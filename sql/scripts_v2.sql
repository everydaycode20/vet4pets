select * from appointmentType;

select * from appointment;

select * from petOwner;

select * from pet;

select * from breed;

select * from petType;

select petowner.nameowner, pet.namePet, appointment.dateAppointment, appointmenttype.appointmentName
from petOwner
join appointment on appointment.idOwner = 1
join pet on pet.id = 1
join appointmenttype on appointmenttype.id = appointment.apointmenttype;

select sum(date(appointment.dateAppointment) = "2021-09-13") as monday,
sum(date(appointment.dateAppointment) = "2021-09-14") as tuesday,
sum(date(appointment.dateAppointment) = "2021-09-15") as wednesday,
sum(date(appointment.dateAppointment) = "2021-09-16") as thursday,
sum(date(appointment.dateAppointment) = "2021-09-17") as friday
from appointment;

select * from veterinarian;

select * from medicine;

select * from testtype;

select * from checkup;

insert into checkup (idVet, idPet, idOwner, reason, symptoms, diagnose, idTest, idMedicine) values (1,1,1, "a", "a", "a", 1, 1);

select medicineType.medicineDescription, medicine.id from medicinetype join medicine where medicineType.id = medicine.idtype;

select veterinarian.nameVet, pet.namePet, petowner.nameOwner, checkup.reason, checkup.diagnose, medicineType.medicineDescription as medicineDesc, medicine.dose as medicineDose, 
checkup.dateCheckup, testType.nametype as testName, test.datetest as testDate
from checkup
join veterinarian on veterinarian.id = checkup.idVet
join pet on pet.id = checkup.idPet
join petowner on petowner.id = checkup.idOwner
join medicine on medicine.id = checkup.idmedicine
join medicinetype on medicine.idtype = medicinetype.id
join test on test.id = checkup.idtest
join testtype on test.idtype = testtype.id
where checkup.idOwner = 1 order by checkup.dateCheckup desc limit 5;






