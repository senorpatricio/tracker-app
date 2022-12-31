
export interface ITodo {
  todo_id: number;
  todo_title: string;
  todo_body: string;
  todo_user_id: string;
  todo_completed: boolean;
  todo_duedate?: Date | null | undefined;
}

export interface ITodos {
  todos: ITodo[]
}

export interface IProps {
  dataLoaded: boolean;
}

export interface IAppState {
  dataLoaded: boolean;
}

export interface IContentState {
  dataLoaded: boolean;
  todos: ITodo[];
  user: IUser | null;
}
export interface IFunc {
  handleAddTodo(str1: string, str2: string , str3: string | null | undefined, str4: boolean, str5: Date | null | undefined): void;
}

export interface IUserId {
  user_id: string | undefined
}

export interface ITodoHandlers {
  handleDeleteTodo(id: number): void;
  handleEditTodo(id: number, title: string, body: string, userId: string, completed: boolean, duedate: (Date | null | undefined)): void;
  // handleEditTodo(id: number, title: string, body: string): void;
}

export interface IEditTodo {
  title: string;
  body: string;
  duedate: Date | null | undefined;
  userId: string;
  completed: boolean;
  open: boolean;
  closeDialog(title: string, body: string, userId: string, completed: boolean, duedate: Date | null | undefined): void;
  // closeDialog(title: string, body: string): void;    
}

export interface IUser {
  user_email: string;
  username: string;
  user_id: string;
}