import React from "react";

import { atom, useAtom } from "jotai";

import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "../../components/drawer/drawer";

type StateType = [boolean, () => void, () => void, () => void] & {
  state: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export const mobileSidebarState = atom(false);

const useToggleState = (initial = false) => {
  const [state, setState] = useAtom(mobileSidebarState);

  const close = () => {
    setState(false);
  };

  const open = () => {
    setState(true);
  };

  const toggle = () => {
    setState((state) => !state);
  };

  const hookData = [state, open, close, toggle] as StateType;
  hookData.state = state;
  hookData.open = open;
  hookData.close = close;
  hookData.toggle = toggle;
  return hookData;
};

interface Book {
  title: string;
  author: string;
  year: number;
  genre: string;
  summary: string;
}

export default function MobileSidebar() {
  const [editOpen, showEdit, closeEdit] = useToggleState();
  const [bookToEdit, setBookToEdit] = React.useState<Book | null>(null);

  const editBook = (book: Book) => {
    setBookToEdit(book);
    showEdit();
  };

  const onSave = () => {
    // update
    closeEdit();
  };

  return (
    <>
      {/* <Table className="overflow-scroll">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Title</TableHeaderCell>
            <TableHeaderCell>Author</TableHeaderCell>
            <TableHeaderCell>Year</TableHeaderCell>
            <TableHeaderCell className="text-right">Actions</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book, index) => (
            <TableRow key={index}>
              <TableCell>{book.title}</TableCell>
              <TableCell className="whitespace-nowrap">{book.author}</TableCell>
              <TableCell>{book.year}</TableCell>
              <TableCell className="text-right">
                <Button variant="secondary" onClick={() => editBook(book)}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> */}

      <div className="flex justify-center">
        <Drawer
          open={editOpen}
          onOpenChange={(modalOpened) => {
            if (!modalOpened) {
              closeEdit();
            }
          }}
        >
          <DrawerContent className="sm:max-w-lg">
            <DrawerHeader>
              <DrawerTitle>{bookToEdit?.title}</DrawerTitle>
              <DrawerDescription className="mt-1 text-sm">
                {bookToEdit?.author} - {bookToEdit?.year}
              </DrawerDescription>
            </DrawerHeader>
            <DrawerBody>
              <p>{bookToEdit?.summary}</p>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}
