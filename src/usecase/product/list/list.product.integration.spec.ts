import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";

describe("Test list product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should list products", async () => {
    const productRepository = new ProductRepository();
    const usecase = new ListProductUseCase(productRepository);

    const inputs = [
      ProductFactory.create("a", "Book A", 25), 
      ProductFactory.create("b", "Book B", 30)
    ]

    inputs.map((input) => productRepository.create(input))
    const result =  await usecase.execute({});
  
    expect(result.products.length).toEqual(inputs.length)
    expect(result.products).toEqual(inputs.map((input) => {return {id: input.id, name: input.name, price: input.price}}));
  });

});
