import GroupModel from './group.model';

class AppModel {
    private groups: GroupModel[];

    public constructor(groups: GroupModel[]) {
        this.groups = groups;
    }

    public getGroups(): GroupModel[] {
        return this.groups;
    }
}

export default AppModel;

/**
 * @description App Model export
 */
export class App {

};