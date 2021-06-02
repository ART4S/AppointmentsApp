/* eslint-disable no-confusing-arrow */
import { Breadcrumbs as MuiBreadcrumbs, Typography } from "@material-ui/core";
import PropTypes from "prop-types";

import RouterLink from "common/components/RouterLink/RouterLink";

export default function Breadcrumbs({ pages }) {
  return (
    <MuiBreadcrumbs>
      {pages.map(({ name, to }) =>
        to ? (
          <RouterLink key={name} to={to}>
            <Typography color="textSecondary">{name}</Typography>
          </RouterLink>
        ) : (
          <Typography
            key={name}
            color="textPrimary"
            style={{ cursor: "default" }}
          >
            {name}
          </Typography>
        ),
      )}
    </MuiBreadcrumbs>
  );
}

Breadcrumbs.propTypes = {
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      to: PropTypes.string,
    }),
  ).isRequired,
};
