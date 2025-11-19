import { Button } from "@material-ui/core";
import {makeStyles} from "@material-ui/core";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    whiteSpace: "nowrap",
    color: "#fff",
  },
}));

const BtnWithIconAndLabel = ({
  labelKey,
  positionIcon,
  icon,
  variant,
  classname,
  onClick
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Button
      variant={variant}
      className={`${classes.button} ${classname}`}
      endIcon={positionIcon === "end" ? icon : null}
      startIcon={positionIcon === "start" ? icon : null}
      onClick={onClick}
    >
      {t(labelKey)}
    </Button>
  );
};

export default BtnWithIconAndLabel;
