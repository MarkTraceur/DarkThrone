import DarkThroneClient from '@darkthrone/client-library';
import SubNavigation from '../../../../components/layout/subNavigation';
import BankNavigation from './components/bankNavigation';

interface BankDepositPageProps {
  client: DarkThroneClient;
}
export default function BankHistoryPage(props: BankDepositPageProps) {
  if (!props.client.authenticatedPlayer) return null;

  return (
    <main>
      <SubNavigation />

      <div className="my-12 w-full max-w-2xl mx-auto overflow-hidden">
        <BankNavigation />

        <div className="bg-zinc-800/50 flex rounded-md overflow-hidden text-zinc-300">
          <table className="min-w-full">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="px-8 py-5 text-left text-sm font-semibold text-white"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-8 py-5 text-sm text-right font-semibold text-white"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  className="px-8 py-5 text-left text-sm font-semibold text-white"
                >
                  Type
                </th>
              </tr>
            </thead>
            <tbody className="bg-zinc-800 divide-y divide-zinc-700/50">
              {props.client.authenticatedPlayer.depositHistory
                .sort(
                  (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime(),
                )
                .map((history, historyIdx) => (
                  <tr key={historyIdx}>
                    <td className="whitespace-nowrap px-8 py-5 text-sm text-zinc-300">
                      {new Date(history.date).toLocaleString()}
                    </td>
                    <td className="whitespace-nowrap px-8 py-5 text-sm text-right text-zinc-300">
                      {new Intl.NumberFormat().format(history.amount)}
                    </td>
                    <td className="whitespace-nowrap px-8 py-5 text-sm text-zinc-300">
                      {history.type === 'deposit' ? 'Deposit' : 'Withdrawal'}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="bg-zinc-800 p-8 mt-8 rounded-md text-zinc-400 text-sm font-semibold">
          Only transactions within the last 24 hours are currently visible.
        </div>
      </div>
    </main>
  );
}
