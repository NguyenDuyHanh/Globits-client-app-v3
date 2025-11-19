import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { observer } from "mobx-react";

import DepartmentForm from "./components/DepartmentForm";
import { useStore } from "app/stores";
import { useEffect } from "react";

const DepartmentEdit = observer(() => {
  const { t } = useTranslation();

  const { departmentStore } = useStore();

  const history = useHistory();

  const { deptId } = useParams();

  useEffect(() => {
    departmentStore.getDepartment(deptId);
  }, []);

  const handleEditDepartment = async (dept) => {
    dept.id = deptId;
    await departmentStore.editDepartment(dept);
    history.push("/category/department");
    toast.success(t("toast.update_success"));
  };

  return (
    <DepartmentForm 
        action="edit" 
        handleEditDepartment={handleEditDepartment}
        department={departmentStore.selectedDepartment}
    />
  );
});

export default DepartmentEdit;
