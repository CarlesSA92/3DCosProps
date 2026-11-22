import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { CommissionsPageContent } from "../components/commissions-page-content";
import { getCommissionPageDictionary } from "../content/commission-content";

describe("CommissionsPageContent", () => {
  it("renders the localized hero, process, customer-facing payment note, and FAQ", () => {
    render(<CommissionsPageContent dict={getCommissionPageDictionary("es")} />);

    expect(screen.getByText("Damos vida a tus")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "El proceso" })).toBeInTheDocument();
    expect(screen.getByText(/Los encargos personalizados se pagan después/)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Preguntas frecuentes" })).toBeInTheDocument();
  });

  it("validates the project idea before moving to the next step", () => {
    render(<CommissionsPageContent dict={getCommissionPageDictionary("en")} />);

    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    expect(screen.getByText("Add a name for your project to continue.")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Project name"), { target: { value: "Replica helmet" } });
    fireEvent.click(screen.getByRole("button", { name: "3D printing" }));
    fireEvent.change(screen.getByLabelText("Project details"), { target: { value: "A wearable helmet with a metallic finish." } });
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    expect(screen.getByText("Share your budget, preferred completion date, and visual references that help explain your idea.")).toBeInTheDocument();
    expect(screen.getByLabelText("Preferred completion date")).toHaveAttribute("min");
    expect(screen.getByRole("option", { name: "Enter an amount" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "I need guidance" })).toBeInTheDocument();
  });

  it("shows a customer-facing project confirmation", () => {
    render(<CommissionsPageContent dict={getCommissionPageDictionary("en")} />);

    fireEvent.change(screen.getByLabelText("Project name"), { target: { value: "Replica helmet" } });
    fireEvent.click(screen.getByRole("button", { name: "3D printing" }));
    fireEvent.change(screen.getByLabelText("Project details"), { target: { value: "A wearable helmet with a metallic finish." } });
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    fireEvent.change(screen.getByLabelText("Name / handle"), { target: { value: "Alex" } });
    fireEvent.change(screen.getByLabelText("Email address"), { target: { value: "alex@example.com" } });
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: "Send my project idea" }));

    expect(screen.getByRole("status")).toHaveTextContent("Your project details are ready for review.");
  });

  it("accepts reference files dropped into the upload area", () => {
    render(<CommissionsPageContent dict={getCommissionPageDictionary("en")} />);
    fireEvent.change(screen.getByLabelText("Project name"), { target: { value: "Replica helmet" } });
    fireEvent.click(screen.getByRole("button", { name: "3D printing" }));
    fireEvent.change(screen.getByLabelText("Project details"), { target: { value: "A wearable helmet with a metallic finish." } });
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    const dropZone = screen.getByText("Drag files here or choose files").closest("label");
    const reference = new File(["reference"], "helmet-reference.png", { type: "image/png" });
    fireEvent.drop(dropZone!, { dataTransfer: { files: [reference] } });

    expect(screen.getByText("helmet-reference.png")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "helmet-reference.png" })).toBeInTheDocument();
  });

  it("offers a manual budget amount when that option is selected", () => {
    render(<CommissionsPageContent dict={getCommissionPageDictionary("en")} />);
    fillProjectStep();
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    fireEvent.change(screen.getByLabelText("Estimated budget"), { target: { value: "custom" } });
    expect(screen.getByLabelText("Budget amount")).toHaveAttribute("type", "number");
  });
});

function fillProjectStep() {
  fireEvent.change(screen.getByLabelText("Project name"), { target: { value: "Replica helmet" } });
  fireEvent.click(screen.getByRole("button", { name: "3D printing" }));
  fireEvent.change(screen.getByLabelText("Project details"), { target: { value: "A wearable helmet with a metallic finish." } });
}