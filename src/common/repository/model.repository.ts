import {
  FilterQuery,
  HydratedDocument,
  Model,
  QueryOptions as MongooseQueryOptions,
} from 'mongoose';

export interface QueryOptions<T> extends MongooseQueryOptions<T> {
  includeDeleted?: boolean;
}

export abstract class BaseRepository<T> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  public async create(
    entity: Omit<T, '_id' | 'createdAt' | 'updatedAt'>,
    options?: QueryOptions<T>,
  ): Promise<HydratedDocument<T>> {
    const insertedData = await this.model.create([entity], options);
    return insertedData[0];
  }

  async find(
    query: FilterQuery<T & { _id: string }>,
    projection?: object,
    options?: QueryOptions<T>,
  ) {
    return this.model.find(query, projection, options);
  }
}
