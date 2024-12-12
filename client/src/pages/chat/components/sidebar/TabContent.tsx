const TabContent = () => {
  return (
    <div>
    <div className="font-medium mb-2">Group Info</div>
    <div className="text-sm text-muted-foreground">Created on Jan 1, 2023</div>
    <div className="mt-4">
      <div className="font-medium">Participants</div>
      <ul className="mt-2">
        <li className="flex items-center gap-3">
          <img
            className="h-8 w-8 rounded-full"
            src="/placeholder-user.jpg"
            alt="Avatar"
          />
          <span>John Doe</span>
        </li>
        <li className="flex items-center gap-3 mt-2">
          <img
            className="h-8 w-8 rounded-full"
            src="/placeholder-user.jpg"
            alt="Avatar"
          />
          <span>Jane Smith</span>
        </li>
      </ul>
    </div>
  </div>
  )
}

export default TabContent