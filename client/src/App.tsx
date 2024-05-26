import './styles/app/app.scss';

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1 className="header">Test Colors</h1>
        <button className="button">Click Me</button>
        <input className="input" placeholder="Enter text..." />
        <select className="select">
          <option value="Option 1">Option 1</option>
          <option value="Option 2">Option 2</option>
          <option value="Option 3">Option 3</option>
        </select>
      </div>
      <div className="footer">
        <p>Footer Content</p>
      </div>
    </div>
  );
}

export default App;
