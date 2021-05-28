import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { useLocalizationContext } from "common/hooks/useLocalization";

export default function LangPicker() {
  const { l, language, languages, setLanguage } = useLocalizationContext();

  return (
    <FormControl>
      <Select
        value={language}
        label={l("home.lang")}
        onChange={(event) => {
          setLanguage(event.target.value);
        }}
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
