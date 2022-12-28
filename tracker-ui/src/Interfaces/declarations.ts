
export interface ITodo {
    todo_id: number 
    todo_title: string 
    todo_body: string 
    todo_duedate?: Date | null | undefined
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
  }
  export interface IFunc {
    handleAddTodo(str1: string, str2: string, str3: Date | null | undefined): void;
  }

  export interface ITodoHandlers {
    handleDeleteTodo(id: number): void;
    handleEditTodo(id: number, title: string, body: string, duedate: Date | null | undefined): void;
    // handleEditTodo(id: number, title: string, body: string): void;
  }

  export interface IEditTodo {
    title: string;
    body: string;
    duedate: Date | null | undefined;
    open: boolean;
    closeDialog(title: string, body: string, duedate: Date | null | undefined): void;    
    // closeDialog(title: string, body: string): void;    
  }