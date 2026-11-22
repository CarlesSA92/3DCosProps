import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { CommissionsPageContent } from "../components/commissions-page-content";
import { getCommissionPageDictionary } from "../content/commission-content";

describe("CommissionsPageContent", () => {
  it("renders the localized hero, process, payment note, and FAQ", () => {
    render(<CommissionsPageContent dict={getCommissionPageDictionary("es")} />);

    expect(screen.getByText("Damos vida a tus")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "El proceso" })).toBeInTheDocument();
    expect(screen.getByText(/Stripe y PayPal están previstos/)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Preguntas frecuentes" })).toBeInTheDocument();
  });

  it("validates the project brief before moving to the next step", () => {
    render(<CommissionsPageContent dict={getCommissionPageDictionary("en")} />);

    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    expect(screen.getByText("Add a name for your project to continue.")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Project name"), { target: { value: "Replica helmet" } });
    fireEvent.click(screen.getByRole("button", { name: "Prop / weapon" }));
    fireEvent.change(screen.getByLabelText("Project details"), { target: { value: "A wearable helmet with a metallic finish." } });
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    expect(screen.getByText("Share a budget range, timing, and any visual references that help explain your idea.")).toBeInTheDocument();
  });

  it("clearly states that the preview does not submit or save a request", () => {
    render(<CommissionsPageContent dict={getCommissionPageDictionary("en")} />);

    fireEvent.change(screen.getByLabelText("Project name"), { target: { value: "Replica helmet" } });
    fireEvent.click(screen.getByRole("button", { name: "Prop / weapon" }));
    fireEvent.change(screen.getByLabelText("Project details"), { target: { value: "A wearable helmet with a metallic finish." } });
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    fireEvent.change(screen.getByLabelText("Name / handle"), { target: { value: "Alex" } });
    fireEvent.change(screen.getByLabelText("Email address"), { target: { value: "alex@example.com" } });
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: "Prepare my brief" }));

    expect(screen.getByRole("status")).toHaveTextContent("Nothing has been sent or saved.");
  });

  it("accepts reference files dropped into the upload area", () => {
    render(<CommissionsPageContent dict={getCommissionPageDictionary("en")} />);
    fireEvent.change(screen.getByLabelText("Project name"), { target: { value: "Replica helmet" } });
    fireEvent.click(screen.getByRole("button", { name: "Prop / weapon" }));
    fireEvent.change(screen.getByLabelText("Project details"), { target: { value: "A wearable helmet with a metallic finish." } });
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    const dropZone = screen.getByText("Drag files here or choose files").closest("label");
    const reference = new File(["reference"], "helmet-reference.png", { type: "image/png" });
    fireEvent.drop(dropZone!, { dataTransfer: { files: [reference] } });

    expect(screen.getByText("helmet-reference.png")).toBeInTheDocument();
  });
});