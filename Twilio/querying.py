import psycopg2
import os
import importlib.util

# Get the absolute path to the constants.py file
constants_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'constants', 'constants.py'))

# Load the constants.py module from the file path
spec = importlib.util.spec_from_file_location('constants', constants_path)
c = importlib.util.module_from_spec(spec)
spec.loader.exec_module(c)


def open_database():
    """
    Sets up the connection to a database, specified by the environment secrets within GitHub.

    Outputs:
    conn:  The connection variable.
    cur:  The cursor variable.
    """
    host=os.environ.get(c.sql_host_env_name)
    database=os.environ.get(c.sql_db_env_name)
    user=os.environ.get(c.sql_user_env_name)
    password=os.environ.get(c.sql_pw_env_name)
    print(f"\n\n\n {host} {database} {user} {password} \n\n\n")
    conn = psycopg2.connect(
        host=host,
        database=database,
        user=user,
        password=password
    )
    cur = conn.cursor()
    return conn, cur


def query(q_string: str, cursor):
    """
    Performs a query.

    Inputs:
    q_string: The query string, should be a valid SQL query (sanitize if time?)
    cursor:  The cursor connected to the database

    Outputs:
    results:  The result of the query.
    """
    cursor.execute(q_string)
    results = cursor.fetchall()
    return results


def close_database(connection, cursor):
    """
    Closes the connection to the database.

    Inputs:
    connection:  an open database connection
    cursor: a cursor to an open database
    """
    cursor.close()
    connection.close()
