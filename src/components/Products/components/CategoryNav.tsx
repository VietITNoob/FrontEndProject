import  {useEffect, useState} from 'react';
import type {Category} from '../../../types';
import {categoryService} from "../../../service/categroryService.tsx";

interface CategoryNavProps {
  onSelectCategory: (categoryId: string) => void;
}

const CategoryNav: React.FC<CategoryNavProps> = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getAll();
        setCategories(data);
      } catch (error) {
        console.error('Lỗi tải danh mục:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) return <div>Đang tải danh mục...</div>;
  return (
    <div className="category-nav">
      <div className="cat-item" onClick={() => onSelectCategory('')}>
          <div className="cat-icon-box">
            <img src="https://cdn-icons-png.flaticon.com/512/1005/1005141.png" alt="All" className="cat-icon" />
          </div>
          <span className="cat-name">All</span>
      </div>
      {categories.map((cat) => (
        <div key={cat.id} className="cat-item" onClick={() => onSelectCategory(String(cat.id))}>
          <div className="cat-icon-box">
            <img src={cat.image} alt={cat.name} className="cat-icon" />
          </div>
          <span className="cat-name">{cat.name}</span>
        </div>
      ))}
    </div>
  );
};

export default CategoryNav;