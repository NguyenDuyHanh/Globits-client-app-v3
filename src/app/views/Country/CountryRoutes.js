import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";

const CountryIndex = EgretLoadable({
  loader: () => import("./CountryIndex"),
});

const CountryDetail = EgretLoadable({
  loader: () => import("./CountryDetail"),
});

const CountryAdd = EgretLoadable({
  loader: () => import("./CountryAdd"),
});

const CountryEdit = EgretLoadable({
  loader: () => import("./CountryEdit"),
});

const Routes = [
  {
    path: ConstantList.ROOT_PATH + "category/country",
    exact: true,
    component: CountryIndex,
  },

  {
    path: ConstantList.ROOT_PATH + "category/country/new",
    exact: true,
    component: CountryAdd,
  },

  {
    path: ConstantList.ROOT_PATH + "category/country/:countryId",
    exact: true,
    component: CountryDetail,
  },

  {
    path: ConstantList.ROOT_PATH + "category/country/edit/:countryId",
    exact: true,
    component: CountryEdit,
  },
];

export default Routes;
