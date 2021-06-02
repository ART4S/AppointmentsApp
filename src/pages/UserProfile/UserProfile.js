import {
  Container,
  Box,
  Grid,
  Avatar,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Link,
  InputAdornment,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import FaceIcon from "@material-ui/icons/Face";

import Header from "common/components/Header/Header";
import Breadcrumbs from "common/components/Breadcrumbs/Breadcrumbs";
import useLocalization from "common/hooks/useLocalization";
import useAuth from "common/hooks/useAuth";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(25),
    height: theme.spacing(25),
    borderRadius: theme.spacing(1),
  },
}));

const SPACING = 2;

export default function UserProfile() {
  const classes = useStyles();
  const auth = useAuth();
  const l = useLocalization();

  return (
    <div>
      <Header title={l("userProfile.page")} Icon={FaceIcon} />
      <Container maxWidth="md">
        <Box mt={2}>
          <Breadcrumbs
            pages={[
              { name: l("userProfile.home"), to: "/" },
              { name: l("userProfile.settings") },
            ]}
          />
        </Box>

        <Box mt={2}>
          <Grid
            container
            direction="row"
            style={{ width: "100%" }}
            spacing={SPACING}
          >
            <Grid item xs={3} style={{ border: "2px dashed" }}>
              <img
                className={classes.avatar}
                src={auth.user.avatar}
                alt="avatar"
                loading="lazy"
              />
            </Grid>

            <Grid item xs={9} style={{ border: "2px dotted" }}>
              Hello
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}
