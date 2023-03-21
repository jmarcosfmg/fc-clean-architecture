import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";

describe("Test create product use case", () => {
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

  it("should create product A", async () => {
    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const input = {
      type: "a",
      name: "Book A",
      price: 25
    };

    const createdProduct = await usecase.execute(input);

    const output = {
      id: createdProduct.id,
      name: "Book A",
      price: 25
    };

    const result = await productRepository.find(createdProduct.id)

    expect(result.id).toEqual(output.id);
    expect(result.name).toEqual(output.name);
    expect(result.price).toEqual(output.price);
  });

  it("should create product B", async () => {
    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const input = {
      type: "b",
      name: "Book B",
      price: 25
    };

    const createdProduct = await usecase.execute(input);

    const output = {
      id: createdProduct.id,
      name: "Book B",
      price: 50
    };

    const result = await productRepository.find(createdProduct.id)

    expect(result.id).toEqual(output.id);
    expect(result.name).toEqual(output.name);
    expect(result.price).toEqual(output.price);
  });
});
