import { DataTypes, Model } from 'sequelize';
import sequelize from '@/configs/database.config';

class Product extends Model {}

Product.init(
  {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    batch: DataTypes.STRING,
    expiration: DataTypes.DATE,
    discount: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: 'Product',
  }
);

export default Product;
