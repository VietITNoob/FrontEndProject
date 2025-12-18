import  {useEffect, useState} from 'react';
import { categoryApi } from '../../../api/categroryApi.tsx';
import type {Category} from '../../../types';

const CategoryNav = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryApi.getAll();
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
      {categories.map((cat) => (
        <div key={cat.id} className="cat-item">
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