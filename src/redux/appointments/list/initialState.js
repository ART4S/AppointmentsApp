import { Record } from "immutable";

import LOADING_STATUSES from "constants/loadingStatuses";

export default Record({
  status: LOADING_STATUSES.idle,
  error: null,

  dataSource: Record({
    entities: Record({})(),

    filter: Record({
      startDate: null,
      finishDate: null,
      clientName: "",
      onlyMe: false,
    })(),
  })(),
});
