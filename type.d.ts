interface IType {
  type: string;
}
interface ISignedInState extends Partial<IType> {
  signedIn: boolean;
}

interface IUpdateUrl extends IType {
  url: string;
}

interface INewLink extends Partial<IType> {
  id?: number;
  url?: string;
  name?: string;
  enable?: boolean;
}

interface IEditLink extends IType, INewLink {}

interface IAllLinks {
  links: INewLink[];
}

interface IUserDetails extends Partial<IType> {
  username?: string;
  password?: string;
  repeatPassword?: string;
  id?: string;
  login?: boolean;
}

interface ISaveState extends Partial<IType> {
  saveState: boolean;
}

interface IAllDBLinks {
  Links?: INewLink[];
}
