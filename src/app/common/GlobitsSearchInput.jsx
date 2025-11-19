import React from "react";
import { observer } from "mobx-react";
import { FormControl } from "@material-ui/core";
import { useStore } from "app/stores";
import SearchIcon from "@material-ui/icons/Search";
import { useTranslation } from "react-i18next";
import "./SearchBox.scss";

export default observer(function GlobitsSearchInput(props) {
  const { t } = useTranslation();

  const { countryStore, departmentStore } = useStore();

  const {search, type} = props;

  const handleKeyDownEnterSearch = (event) => {
    if (event.key === "Enter") {
      var searchObject = {};
      if (type === "department") {
        searchObject.keyword = departmentStore.keyword;
      } else if (type === "country") {
        searchObject.keyword = countryStore.keyword;
      }
      search(searchObject);
    }
  };

  const handleChange = (event) => {
    if (type === "country") {
      countryStore.setKeyword(event.target.value);
    }
    else if (type === "department") {
      departmentStore.setKeyword(event.target.value);
    }
  };

  return (
    <FormControl fullWidth>
      <div className="search-box">
        <input
          onChange={handleChange}
          onKeyDown={handleKeyDownEnterSearch}
          placeholder={t("general.enter_search")}
        />
        <button
          className="btn btn-search"
          onClick={() => {
            var searchObject = {};
            searchObject.keyword = countryStore.keyword;
            search(searchObject);
          }}
        >
          <SearchIcon
            style={{
              position: "absolute",
              top: "4px",
              right: "3px",
            }}
          />
        </button>
      </div>
    </FormControl>
  );
});
