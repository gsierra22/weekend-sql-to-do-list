CREATE TABLE "list" (
    id SERIAL PRIMARY KEY,
    tasks text,
    task_completed boolean
);


INSERT INTO "list" (tasks, task_completed) VALUES ( 'Work', false );

UPDATE "list" SET task_completed=true WHERE id=5;