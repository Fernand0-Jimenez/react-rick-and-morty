import { useEffect, useState } from "react";
import Character from "./Character";

function NavPage(props) {
  return (
    <header className="d-flex justify-content-between align-items-center">
      <p>Pagina: {props.page} </p>
      <button
        className="btn btn-primary btn-sm"
        onClick={() => props.setPage(props.page + 1)}
      >
        Next
      </button>
    </header>
  );
}
const CharacterList = () => {
  const [character, setCharactere] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${page}`
      );
      const data = await response.json();
      setCharactere(data.results);
    }

    fetchData();
  }, [page]);

  return (
    <div className="container ">
      <NavPage page={page} setPage={setPage} />
      <div className="row">
        {character.map((character) => {
          return (
            <div className="col-md-4" key={character.id}>
              <Character character={character} />
            </div>
          );
        })}
      </div>
      <NavPage page={page} setPage={setPage} />
    </div>
  );
};

export default CharacterList;
