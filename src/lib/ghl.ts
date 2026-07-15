/**
 * GoHighLevel API Integration
 * Handles lead capture, qualification, and automation
 */

const GHL_API_KEY = import.meta.env.GHL_API_KEY || "pit-4549b805-bda8-4a9a-b1b3-c38568232269";
const GHL_LOCATION_ID = "x1tQhDL5U66JMfRMRPzT";
const GHL_API_URL = "https://rest.gohighlevel.com/v1";

export interface LeadData {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  company?: string;
  workspaceType?: string;
  source?: string;
  budget?: string;
  timeline?: string;
  location?: string;
  companySize?: string;
}

/**
 * Create a contact in GHL and add to pipeline
 */
export async function createGHLContact(data: LeadData) {
  try {
    const response = await fetch(
      `${GHL_API_URL}/contacts/`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GHL_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          locationId: GHL_LOCATION_ID,
          firstName: data.firstName,
          lastName: data.lastName || "",
          email: data.email,
          phone: data.phone || "",
          companyName: data.company || "",
          source: data.source || "Website Form",
          customFields: {
            workspaceType: data.workspaceType,
            budget: data.budget,
            timeline: data.timeline,
            location: data.location,
            companySize: data.companySize,
          },
          tags: ["website-lead", data.source || "form"],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`GHL API error: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error creating GHL contact:", error);
    throw error;
  }
}

/**
 * Send WhatsApp message via GHL
 */
export async function sendWhatsAppMessage(
  contactId: string,
  message: string
) {
  try {
    const response = await fetch(
      `${GHL_API_URL}/contacts/${contactId}/messages`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GHL_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          locationId: GHL_LOCATION_ID,
          type: "WhatsApp",
          message: message,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to send WhatsApp message`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    throw error;
  }
}

/**
 * Log lead conversion event
 */
export async function logLeadConversion(
  contactId: string,
  conversionType: "form_submission" | "day_pass" | "calculator" | "guide_download"
) {
  try {
    const response = await fetch(
      `${GHL_API_URL}/contacts/${contactId}/events`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GHL_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          locationId: GHL_LOCATION_ID,
          eventType: conversionType,
          timestamp: new Date().toISOString(),
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to log event`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error logging conversion:", error);
    throw error;
  }
}
