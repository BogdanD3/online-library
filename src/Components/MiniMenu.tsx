function MiniMenu() {
  return (
    <div className="mini-menu">
      <a href="/izdavanje" className="menu-item" style={{boxShadow: '0 0 5px black'}}>
        Izdate Knjige
      </a>
      <a href="/vracene-knjige" className="menu-item" style={{boxShadow: '0 0 5px black'}}>
        Vracene Knjige
      </a>
      <a href="/prekoracena-izdavanja" className="menu-item" style={{boxShadow: '0 0 5px black'}}>
        Knjige u Prekoracenju
      </a>
      <a href="/rezervacije" className="menu-item" style={{boxShadow: '0 0 5px black'}}>
        Aktivne Rezervacije
      </a>
      <a href="/arhivirane-rezervacije" className="menu-item" style={{boxShadow: '0 0 5px black'}}>
        Arhivirane Rezervacije
      </a>
      <style>{`
          .mini-menu {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 6rem 0 0 5rem;
          }
          .menu-item {
            background-color: red;
            width: 11rem;
            display: flex;
            justify-content: center; 
            align-items: center;    
            padding: 1rem;          
            margin: 0.5rem 0;       
            text-decoration: none;  
            color: white;           
            border-radius: 4px;  
            cursor: pointer;   
          }
        `}</style>
    </div>
  );
}

export default MiniMenu;
