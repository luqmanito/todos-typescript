import {
  getTodos,
  getRunningQueriesThunk,
} from "../../../lib/todosApi";

import { wrapper } from "../../../lib/store";
import TodosHome from "../[name]";

export default TodosHome;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const name = context.params?.name;

    if (typeof name === "string") {
      store.dispatch(getTodos.initiate(name));
    }

    await Promise.all(store.dispatch(getRunningQueriesThunk()));
    return {
      props: {},
      // revalidate: 60
    };
  }
);
