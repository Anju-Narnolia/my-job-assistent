import React, { useState, useEffect } from "react";
import { motion as Motion } from "framer-motion";
import Dashboard from "../Components/Dashboard";
import { Sidebar, SidebarBody, SidebarLink } from "../Components/Sidebar";
import cn from "../../lib/utils";
import { Icon360, Icon3dCubeSphere } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { Link, Links } from "react-router-dom";

export default function DemoPage() {
  const [open, setOpen] = useState(false);
  const [chatDates, setChatDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const baseUrl = useSelector((state) => state.config.apiBaseUrl);
  const userId = user?._id;
  const name = user?.email;

  // Fetch all chat dates and auto-load today's messages
  useEffect(() => {
    async function loadDatesAndTodayMessages() {
      try {
        const res = await fetch(`${baseUrl}/api/chat/dates/${userId}`);
        const data = await res.json();
        // Handle backend response format: {success: true, dates: [...]}
        const dates = data.success ? data.dates || [] : [];
        setChatDates(dates);

        // Auto-select today's date if available, otherwise select the most recent date
        const today = new Date().toISOString().split("T")[0];
        const selectedDate = dates.includes(today) ? today : dates[0];

        if (selectedDate) {
          setSelectedDate(selectedDate);
          // Load messages for the selected date
          const messagesRes = await fetch(
            `${baseUrl}/api/chat/${userId}/${selectedDate}`
          );
          const messagesData = await messagesRes.json();
          setMessages(messagesData.success ? messagesData.messages || [] : []);
        }
      } catch (err) {
        console.error("Failed to fetch chat dates:", err);
        setChatDates([]);
      }
    }

    if (userId) {
      loadDatesAndTodayMessages();
    }
  }, [userId]);

  // Fetch chat messages for a specific date
  const handleDateClick = async (date) => {
    if (selectedDate === date) return; // Don't reload if already selected

    setSelectedDate(date);
    setLoading(true);

    try {
      const res = await fetch(`${baseUrl}/api/chat/${userId}/${date}`);
      const data = await res.json();
      // Handle backend response format: {success: true, messages: [...]}
      setMessages(data.success ? data.messages || [] : []);
    } catch (err) {
      console.error("Failed to fetch messages for date:", date, err);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "mx-auto flex w-full h-full flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-800 dark:bg-neutral-800",
        "h-screen "
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {chatDates.map((date, idx) => {
                const formatDate = (dateStr) => {
                  const date = new Date(dateStr);
                  const today = new Date();
                  const yesterday = new Date(today);
                  yesterday.setDate(yesterday.getDate() - 1);

                  if (dateStr === today.toISOString().split("T")[0]) {
                    return "Today";
                  } else if (
                    dateStr === yesterday.toISOString().split("T")[0]
                  ) {
                    return "Yesterday";
                  } else {
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year:
                        date.getFullYear() !== today.getFullYear()
                          ? "numeric"
                          : undefined,
                    });
                  }
                };

                return (
                  <SidebarLink
                    key={idx}
                    link={{
                      label: formatDate(date),
                      onClick: () => handleDateClick(date),
                      icon: <Icon360 />,
                    }}
                    className={
                      selectedDate === date
                        ? "bg-gray-300 dark:bg-gray-700 cursor-pointer rounded p-1"
                        : "cursor-pointer"
                    }
                  />
                );
              })}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: name,
                Links: "/",
                icon: (
                  <img
                    src="https://anju-narnolia.netlify.app/static/media/myPhoto.817151b8a0a59d40ced8.jpg"
                    className="h-7 w-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>

      <Dashboard
        messages={messages}
        userId={userId}
        selectedDate={selectedDate}
        loading={loading}
      />
    </div>
  );
}

export const Logo = () => (
  <p className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal dark:text-white text-black">
    <Icon3dCubeSphere />
    <Motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="font-medium whitespace-pre dark:text-white text-black"
    >
      AI Chat Assistant
    </Motion.span>
  </p>
);

export const LogoIcon = () => (
  <Link
    to="/chat"
    className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal dark:text-white text-black"
  >
    <Icon3dCubeSphere />
  </Link>
);
