import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";

const DepartmentIndex = EgretLoadable({
  loader: () => import("./DepartmentIndex"),
});

const DepartmentAdd = EgretLoadable({
  loader: () => import("./DepartmentAdd"),
});

const DepartmentDetail = EgretLoadable({
  loader: () => import("./DepartmentDetail"),
});

const DepartmentEdit = EgretLoadable({
  loader: () => import("./DepartmentEdit"),
});

const Routes = [
  {
    path: ConstantList.ROOT_PATH + "category/department",
    exact: true,
    component: DepartmentIndex,
  },
  {
    path: ConstantList.ROOT_PATH + "category/department/new",
    exact: true,
    component: DepartmentAdd,
  },
  {
    path: ConstantList.ROOT_PATH + "category/department/viewDetail/:deptId",
    exact: true,
    component: DepartmentDetail,
  },
  {
    path: ConstantList.ROOT_PATH + "category/department/edit/:deptId",
    exact: true,
    component: DepartmentEdit,
  },
];

export default Routes;
