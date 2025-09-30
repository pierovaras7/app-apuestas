import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Bets() {
  const [bets, setBets] = useState([]);

  useEffect(() => {
    const fetchBets = async () => {
      try {
        const { data } = await api.get("/bets");
        setBets(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBets();
  }, []);

  return (
    <div>
      <h2>Mis Apuestas</h2>
      <ul>
        {bets.map(b => (
          <li key={b.id}>
            <strong>{b.type.toUpperCase()}</strong> | {b.description} | Stake: {b.stake} | Cuota: {b.odd}
            {b.selections?.length > 0 && (
              <ul>
                {b.selections.map(sel => (
                  <li key={sel.id}>
                    {sel.event_name} - {sel.market} - {sel.pick} (odd {sel.odd})
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
