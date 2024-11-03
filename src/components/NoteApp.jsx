import  { useState } from 'react';

const NoteApp = () => {
    const [notes, setNotes] = useState([]); // notların saklandığı dizi
    const [note, setNote] = useState(''); // kullanıcıdan alınan not
    const [color, setColor] = useState(''); // seçilen renk
    const [filter, setFilter] = useState(''); // filtreleme metni
    const [editIndex, setEditIndex] = useState(null); // düzenleme için notun indexi

    const colorOptions = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33A6'];

    const addOrUpdateNote = () => {
        if (note) {
            if (editIndex !== null) {
                // Eğer düzenleme modundaysak mevcut notu güncelle
                const updatedNotes = notes.map((n, index) => 
                    index === editIndex ? { text: note, color } : n
                );
                setNotes(updatedNotes);
                setEditIndex(null); // düzenlemeyi bitir
            } else {
                // Yeni not ekleme
                setNotes([...notes, { text: note, color }]);
            }
            setNote(''); // not kutusunu temizliyoruz
            setColor(''); // rengi sıfırlıyoruz
        }
    };

    const deleteNote = (index) => {
        setNotes(notes.filter((_, i) => i !== index)); // burda alt çizgi bu parametre önemsiz kullanmicaz sonra demekmiş. best practice
    };

    const filteredNotes = notes.filter(n => 
        n.text.toLowerCase().includes(filter.toLowerCase()) //notlar arasında arama yapıcaz, byk-kçk harf duyarsız.
    );

    return (
        <div className='container'>

            <input className='search'
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Search"
            />


            <textarea 
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Write your note..."
            />

            <div >
                {colorOptions.map((c, index) => (
                    <button 
                        key={index} 
                        style={{ backgroundColor: c, padding: '10px', margin: '5px', border: 'none', borderRadius:'50%', cursor: 'pointer' }} 
                        onClick={() => setColor(c)}
                    />
                ))}
            </div>

            <button onClick={addOrUpdateNote}>{editIndex !== null ? 'Edit' : 'Add Note'}</button>

           
            <div>
                {filteredNotes.map((n, index) => (
                    <div key={index} style={{ backgroundColor: n.color, display: 'flex', justifyContent: 'space-between', padding: '10px', margin: '5px 0' }}>
                        <span>{n.text}</span>
                        <div>
                            {/* Düzenleme butonu */}
                            <button onClick={() => { setEditIndex(index); setNote(n.text); setColor(n.color); }} style={{ backgroundColor: '#ffcc33', color: '#fff', border: 'none', cursor: 'pointer' }}>
                                Edit
                            </button>
                            {/* Silme butonu */}
                            <button onClick={() => deleteNote(index)} style={{ backgroundColor: '#ff3333', color: '#fff', border: 'none', cursor: 'pointer' }}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NoteApp;
