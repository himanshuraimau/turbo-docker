import { prismaClient } from "db/client";



export default async function Home() {
  const users = await prismaClient.user.findMany();
  return (
    <div>
      <div>
        <h1>Users</h1>
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.username  } ----------
              {user.password}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
