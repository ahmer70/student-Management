import Notes from "./Notes";

export default function Home(props) {
  return (
    <div>
      <div>
        <Notes showAlert={props.showAlert} />
      </div>
    </div>
  );
}
