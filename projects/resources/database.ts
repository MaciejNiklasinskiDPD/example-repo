import {
    Spanner,
    Database as SpannerDatabase,
    Instance,
} from "@google-cloud/spanner";
import { IDatabase, IQuery } from "common";

class Database implements IDatabase {
    private instance: Instance | undefined;
    private database: SpannerDatabase | undefined;

    async connect() {
        const spanner = new Spanner({
            projectId: process.env.SPANNER_PROJECT_ID || ""
        });

        this.instance = spanner.instance(process.env.SPANNER_INSTANCE_NAME || "");
        this.database = this.instance.database(process.env.SPANNER_DATABASE_NAME || "");
    }

    async run<T>(query: IQuery): Promise<T[]> {
        if (!this.database)
            throw new Error("Not connected with database");

        const [rows] = await this.database.run({ ...query, json: true });
        return rows as unknown as T[];
    }
}

// Would this be spanner in this case? As in a spanner instance and not IDatabase?
export const getDatabase = () => new Database() as IDatabase; 
