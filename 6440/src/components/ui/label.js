export function Label({ htmlFor, children }) {
    return <label htmlFor={htmlFor} className="text-gray-700">{children}</label>;
  }
  