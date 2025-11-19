import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import DepartmentForm from "./components/DepartmentForm";
import { useStore } from "app/stores";

const DepartmentAdd = () => {
  const { departmentStore } = useStore();

  const { t } = useTranslation();

  const handleCreateDepartment = async (departmentData) => {
    await departmentStore.createDepartment(departmentData);
    toast.success(t("toast.add_success"));
  };
  return (
      <DepartmentForm 
        action="add" 
        handleCreateDepartment={handleCreateDepartment}
      />
  );
};

export default DepartmentAdd;
