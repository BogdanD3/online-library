import React, { useState } from 'react';
import './SettingsKategorije.css';

interface Category {
  id: number;
  name: string;
}

const SettingsKategorije: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' },
    { id: 3, name: 'Category 3' }
  ]);

  const addCategory = () => {
    // TO DO: implement add category logic
  };

  const deleteCategory = (id: number) => {
    // TO DO: implement delete category logic
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Settings Kategorije</h1>
        <button className="add-category-btn" onClick={addCategory}>
          Add Category
        </button>
      </div>
      <ul className="category-list">
        {categories.map((category) => (
          <li key={category.id}>
            {category.name}
            <button
              className="delete-category-btn"
              onClick={() => deleteCategory(category.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SettingsKategorije;