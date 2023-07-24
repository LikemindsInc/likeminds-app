import { SelectList } from "react-native-dropdown-select-list";
import React from "react";

export const Tailor = () => {
  const [selected, setSelected] = React.useState("");

  const data = [{ key: "1", value: "Sponsoring Companies, DI&E Hires" }];

  return (
    <SelectList
      setSelected={(val: string) => setSelected(val)}
      data={data}
      save="value"
      defaultOption={{ key: "0", value: "Tailor" }}
      inputStyles={{
        color: "#88969D",
      }}
      boxStyles={{
        backgroundColor: "#F3F5F7",
        borderColor: "#F3F5F7",
        borderRadius: 40,
      }}
    />
  );
};

export const PostDate = () => {
  const [selected, setSelected] = React.useState("");

  const data = [{ key: "1", value: "3h ago" }];

  return (
    <SelectList
      setSelected={(val: string) => setSelected(val)}
      data={data}
      save="value"
      defaultOption={{ key: "0", value: "Date Posted" }}
      inputStyles={{
        color: "#88969D",
      }}
      boxStyles={{
        backgroundColor: "#F3F5F7",
        borderColor: "#F3F5F7",
        borderRadius: 40,
      }}
    />
  );
};

export const Location = () => {
  const [selected, setSelected] = React.useState("");

  const data = [{ key: "1", value: "Remote" }];

  return (
    <SelectList
      setSelected={(val: string) => setSelected(val)}
      data={data}
      save="value"
      defaultOption={{ key: "0", value: "Location" }}
      inputStyles={{
        color: "#88969D",
      }}
      boxStyles={{
        backgroundColor: "#F3F5F7",
        borderColor: "#F3F5F7",
        borderRadius: 40,
      }}
    />
  );
};

export const ExperienceLevel = () => {
  const [selected, setSelected] = React.useState("");

  const data = [{ key: "1", value: "Senior Level" }];

  return (
    <SelectList
      setSelected={(val: string) => setSelected(val)}
      data={data}
      save="value"
      defaultOption={{ key: "0", value: "Experience Level" }}
      inputStyles={{
        color: "#88969D",
      }}
      boxStyles={{
        backgroundColor: "#F3F5F7",
        borderColor: "#F3F5F7",
        borderRadius: 40,
      }}
    />
  );
};

export const Industry = () => {
  const [selected, setSelected] = React.useState("");

  const data = [{ key: "1", value: "Internet Technology" }];

  return (
    <SelectList
      setSelected={(val: string) => setSelected(val)}
      data={data}
      save="value"
      defaultOption={{ key: "0", value: "Industry" }}
      inputStyles={{
        color: "#88969D",
      }}
      boxStyles={{
        backgroundColor: "#F3F5F7",
        borderColor: "#F3F5F7",
        borderRadius: 40,
      }}
    />
  );
};

export const Type = () => {
  const [selected, setSelected] = React.useState("");

  const data = [{ key: "1", value: "Full Time" }];

  return (
    <SelectList
      setSelected={(val: string) => setSelected(val)}
      data={data}
      save="value"
      defaultOption={{ key: "0", value: "Type" }}
      inputStyles={{
        color: "#88969D",
      }}
      boxStyles={{
        backgroundColor: "#F3F5F7",
        borderColor: "#F3F5F7",
        borderRadius: 40,
      }}
    />
  );
};

export const Company = () => {
  const [selected, setSelected] = React.useState("");

  const data = [{ key: "1", value: "LikeMinds" }];

  return (
    <SelectList
      setSelected={(val: string) => setSelected(val)}
      data={data}
      save="value"
      defaultOption={{ key: "0", value: "Company" }}
      inputStyles={{
        color: "#88969D",
      }}
      boxStyles={{
        backgroundColor: "#F3F5F7",
        borderColor: "#F3F5F7",
        borderRadius: 40,
      }}
    />
  );
};

export const Salary = () => {
  const [selected, setSelected] = React.useState("");

  const data = [{ key: "1", value: "$100k - $150k" }];

  return (
    <SelectList
      setSelected={(val: string) => setSelected(val)}
      data={data}
      save="value"
      defaultOption={{ key: "0", value: "Salary" }}
      inputStyles={{
        color: "#88969D",
      }}
      boxStyles={{
        backgroundColor: "#F3F5F7",
        borderColor: "#F3F5F7",
        borderRadius: 40,
      }}
    />
  );
};
