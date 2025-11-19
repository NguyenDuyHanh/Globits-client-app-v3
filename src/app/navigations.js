import ConstantList from "./appConfig";

export const navigations = [
  {
    name: "navigation.dashboard",
    icon: "home",
    path: ConstantList.ROOT_PATH + "dashboard",
    isVisible: true,
  },
  {
    name: "navigation.directory",
    icon: "dashboard",
    isVisible: true,
    children: [
      {
        name: "navigation.country",
        path: ConstantList.ROOT_PATH + "category/country",
        icon: "remove",                                                                                                                                                                                                                                                                                                                                                                                                                       
        isVisible: true,
      },

      {
        name: "navigation.department",
        path: ConstantList.ROOT_PATH + "category/department",
        icon: "remove",
        isVisible: true,
      },
      
    ],
  },
  
];
