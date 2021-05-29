import {
  FormControl,
  Select,
  MenuItem,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { useLocalizationContext } from "common/hooks/useLocalization";

const useStyles = makeStyles((theme) => ({
  select: {
    color: theme.palette.common.white,
  },
  icon: {
    color: theme.palette.common.white,
  },
}));

export default function LangPicker() {
  const classes = useStyles();
  const { l, language, languages, setLanguage } = useLocalizationContext();

  return (
    <FormControl className={classes.control}>
      <Select
        className={classes.select}
        disableUnderline
        value={language}
        classes={{ icon: classes.icon }}
        label={l("home.lang")}
        onChange={(event) => setLanguage(event.target.value)}
      >
        {Object.entries(languages).map(([key, value]) => (
          <MenuItem key={key} value={key}>
            {value.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
