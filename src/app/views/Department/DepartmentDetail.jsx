import { useEffect } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { observer } from "mobx-react"

import DepartmentForm from "./components/DepartmentForm"
import { useStore } from "app/stores"

const DepartmentDetail = observer(() => {
    const { deptId } = useParams();

    const { departmentStore } = useStore();

    useEffect(() => {
        departmentStore.getDepartment(deptId);
    }, []);
  return (
    <div>
        <DepartmentForm 
            action="viewDetail" 
            department={departmentStore.selectedDepartment}
        />
    </div>
  )
});

export default DepartmentDetail