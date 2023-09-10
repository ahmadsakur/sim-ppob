import {
  selectBalance,
  selectTransactions,
} from "@/store/transaction/selectors";
import { useSelector } from "react-redux";

function useTransaction() {
  const transactions = useSelector(selectTransactions);
  const balance = useSelector(selectBalance);
  return { transactions, balance };
}
export default useTransaction;
