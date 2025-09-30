import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function NewBet() {
  const [type, setType] = useState("simple");
  const [description, setDescription] = useState("");
  const [stake, setStake] = useState("");
  const [odd, setOdd] = useState("");
  const [selections, setSelections] = useState([
    { event_name: "", market: "", pick: "", odd: "" }
  ]);
  const navigate = useNavigate();

  const addSelection = () => {
    setSelections([...selections, { event_name: "", market: "", pick: "", odd: "" }]);
  };

  const handleSelectionChange = (idx, field, value) => {
    const copy = [...selections];
    copy[idx][field] = value;
    setSelections(copy);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const payload = { type, description, stake };
      if (type === "simple") {
        payload.odd = odd;
      } else {
        payload.selections = selections;
      }
      await api.post("/bets", payload);
      navigate("/");
    } catch (err) {
      alert("Error al guardar");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Nueva Apuesta</h2>
      <select value={type} onChange={e=>setType(e.target.value)}>
        <option value="simple">Simple</option>
        <option value="combinada">Combinada</option>
      </select>
      <input placeholder="Descripción" value={description} onChange={e=>setDescription(e.target.value)}/>
      <input placeholder="Stake" value={stake} onChange={e=>setStake(e.target.value)}/>
      
      {type === "simple" ? (
        <input placeholder="Cuota" value={odd} onChange={e=>setOdd(e.target.value)}/>
      ) : (
        <div>
          <h4>Selecciones</h4>
          {selections.map((s, idx) => (
            <div key={idx}>
              <input placeholder="Evento" value={s.event_name}
                     onChange={e=>handleSelectionChange(idx,"event_name",e.target.value)}/>
              <input placeholder="Mercado" value={s.market}
                     onChange={e=>handleSelectionChange(idx,"market",e.target.value)}/>
              <input placeholder="Pick" value={s.pick}
                     onChange={e=>handleSelectionChange(idx,"pick",e.target.value)}/>
              <input placeholder="Odd" value={s.odd}
                     onChange={e=>handleSelectionChange(idx,"odd",e.target.value)}/>
            </div>
          ))}
          <button type="button" onClick={addSelection}>+ Añadir Selección</button>
        </div>
      )}

      <button>Guardar</button>
    </form>
  );
}
