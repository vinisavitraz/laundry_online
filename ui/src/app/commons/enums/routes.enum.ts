export enum RoutesEnum {
    HOME = '',
    LOGIN = 'login',
    REGISTER = 'register',
    CUSTOMER_HOME = 'customer',
    EMPLOYEE_HOME = 'employee',
    CREATE_ORDER = 'orders/create',
    ORDER_SUMMARY = 'orders/summary/:id',
    LIST_ORDERS = 'orders/list',
    SEARCH_ORDER = 'orders/search',
    ORDER_DETAIL = 'orders/detail',
    LIST_CLOTHINGS = 'clothings/list',
    CREATE_CLOTHING = 'clothings/create',
    EDIT_CLOTHING = 'clothings/edit/:id',
    LIST_EMPLOYEES = 'employees/list',
    CREATE_EMPLOYEE = 'employees/create',
    EDIT_EMPLOYEE = 'employees/edit/:id',
    SELECT_REPORT = 'reports/select',
}