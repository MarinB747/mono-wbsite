import React, { createContext } from "react";
import { useLocalStore, useObserver } from "mobx-react";
import { observable } from "mobx";

const ListContext = createContext();

const ListProvider = ({ children }) => {
  const list = useLocalStore(() =>
    observable({
      rowsPerPage: 5,
      currentPage: 1,
      filterBrand: "",
      pageCount: [{ pages: 5 }, { pages: 10 }, { pages: 20 }],
      newBrand: "",
      newModel: "",
      newYear: "",
      renameId: "",
      showRenameForm: false,

      setRowsPerPage: (e) => {
        list.rowsPerPage = parseInt(e);
      },
      setPreviousPage: () => {
        list.currentPage = list.currentPage - 1;
      },
      setNextPage: () => {
        list.currentPage = list.currentPage + 1;
      },
      filterByBrand: (e) => {
        list.filterBrand = e;
      },
      setNewBrand: (e) => {
        list.newBrand = e;
      },
      setNewModel: (e) => {
        list.newModel = e;
      },
      setNewYear: (e) => {
        list.newYear = e;
      },
      setRenameId: (e) => {
        list.renameId = e;
      },
      getId: (e, item) => {
        item(e);
      },
      setShowRenameForm: (e) => {
        list.showRenameForm = !list.showRenameForm;
      }
    })
  );

  return useObserver(() => (
    <ListContext.Provider value={list}>{children}</ListContext.Provider>
  ));
};
export { ListContext, ListProvider };
