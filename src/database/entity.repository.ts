import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';

export abstract class EntityRepository<T extends Document> {
    constructor(protected readonly entityModel: Model<T>) {}

    async findOne(
        entityFilterQuery: FilterQuery<T>,
        projection?: Record<string, unknown>,
    ): Promise<T | null> {
        const result = await this.entityModel
            .findById(entityFilterQuery.id, {
                _id: 0,
                __v: 0,
                ...projection,
            })
            .exec();
        console.log(result);

        return result;
    }

    async find(entityFilterQuery: FilterQuery<T>): Promise<T[] | null> {
        return this.entityModel.find(entityFilterQuery);
    }

    async create(createEntityData: unknown): Promise<T | any> {
        const entity = new this.entityModel(createEntityData);
        return entity.save();
    }

    async findByIdAndUpdate(
        entityFilterQuery: FilterQuery<T>,
        updateEntityData: UpdateQuery<unknown>,
    ): Promise<T | null> {
        return this.entityModel.findByIdAndUpdate(
            entityFilterQuery.id,
            updateEntityData,
            {
                new: true,
            },
        );
    }

    async deleteOne(entityFilterQuery: FilterQuery<T>): Promise<T> {
        const deleteResult = await this.entityModel.findByIdAndDelete(
            entityFilterQuery.id,
        );

        return deleteResult;
    }
}
