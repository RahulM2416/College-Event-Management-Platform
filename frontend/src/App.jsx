import { useEffect, useState } from "react";
import axios from "axios";
import { CalendarDays, Ticket, PlusCircle, LogOut } from "lucide-react";

const API = "http://localhost:3000/api";

export default function App() {
  const [events, setEvents] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [mode, setMode] = useState("login");

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });

  useEffect(() => {
    if (token) fetchEvents();
  }, [token]);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${API}/events`);
      setEvents(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  // LOGIN
  const login = async () => {
    try {
      const res = await axios.post(`${API}/auth/login`, loginData);
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
    } catch (e) {
      alert("Login failed");
    }
  };

  // REGISTER
  const registerUser = async () => {
    try {
      await axios.post(`${API}/auth/register`, form);
      alert("Registered! Please login.");
      setMode("login");
    } catch {
      alert("Registration failed");
    }
  };

  // LOGOUT
  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  // CREATE EVENT
  const createEvent = async () => {
    try {
      await axios.post(`${API}/events`, eventForm, {
        headers: { Authorization: token },
      });
      setEventForm({ title: "", description: "", date: "", location: "" });
      fetchEvents();
    } catch {
      alert("Error creating event");
    }
  };

  // REGISTER EVENT
  const registerEvent = async (eventId) => {
    try {
      const res = await axios.post(
        `${API}/register`,
        { eventId },
        { headers: { Authorization: token }, responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "ticket.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (e) {
      if (e.response?.status === 401) {
        alert("Session expired. Please login again.");
        logout();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow">
        <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          <CalendarDays /> EventHub
        </h1>

        {token && (
          <button onClick={logout} className="flex items-center gap-2 text-red-500">
            <LogOut /> Logout
          </button>
        )}
      </header>

      {/* AUTH UI */}
      {!token && (
        <div className="flex justify-center items-center h-[80vh]">
          <div className="bg-white p-8 rounded-2xl shadow w-full max-w-md">
            <div className="flex mb-6">
              <button
                onClick={() => setMode("login")}
                className={`flex-1 py-2 ${mode === "login" ? "border-b-2 border-blue-600 text-blue-600" : ""}`}
              >
                Login
              </button>
              <button
                onClick={() => setMode("signup")}
                className={`flex-1 py-2 ${mode === "signup" ? "border-b-2 border-blue-600 text-blue-600" : ""}`}
              >
                Sign Up
              </button>
            </div>

            {mode === "login" ? (
              <>
                <input className="input" placeholder="Email" onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
                <input className="input" type="password" placeholder="Password" onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
                <button onClick={login} className="btn">Login</button>
              </>
            ) : (
              <>
                <input className="input" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <input className="input" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <input className="input" type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
                <button onClick={registerUser} className="btn">Sign Up</button>
              </>
            )}
          </div>
        </div>
      )}

      {/* DASHBOARD */}
      {token && (
        <div className="p-6 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-2xl shadow mb-8 max-w-xl">
            <h2 className="text-xl font-semibold mb-4">Create Event</h2>

            <input className="input" placeholder="Title" value={eventForm.title} onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })} />
            <input className="input" placeholder="Description" value={eventForm.description} onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })} />
            <input type="date" className="input" value={eventForm.date} onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })} />
            <input className="input" placeholder="Location" value={eventForm.location} onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })} />

            <button onClick={createEvent} className="btn">Create Event</button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event._id} className="bg-white p-6 rounded-2xl shadow">
                <h3 className="text-lg font-bold">{event.title}</h3>
                <p className="text-gray-500">{event.description}</p>
                <p className="text-sm text-gray-400">📅 {new Date(event.date).toLocaleDateString()}</p>
                <p className="text-sm text-gray-400">📍 {event.location}</p>

                <button onClick={() => registerEvent(event._id)} className="bg-blue-500 text-white px-4 py-2 rounded-xl mt-4 flex items-center gap-2">
                  <Ticket /> Register
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .input { width:100%; padding:10px; margin-bottom:10px; border:1px solid #e5e7eb; border-radius:10px; }
        .btn { width:100%; padding:10px; background:#2563eb; color:white; border-radius:10px; }
      `}</style>
    </div>
  );
}
