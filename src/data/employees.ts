/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useCallback } from 'react';
import * as XLSX from 'xlsx';
import { Employee } from "@/types/employee";

// Exported shared array
export const employeesData: Employee[] = [];

export const useEmployeesData = (sheetId: string) => {
  const [loading, setLoading] = useState(true);

  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);

      const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;

      const response = await fetch(csvUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch Google Sheet');
      }

      const csvText = await response.text();

      // Parse CSV using XLSX
      const workbook = XLSX.read(csvText, { type: 'string' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];

      const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

      const loadedEmployees: Employee[] = jsonData.map((row) => ({
        EmployeeID: row.EmployeeID,
        Name: row.Name,
        Role: row.Role,
        AvailableHours: Number(row.AvailableHours),
        ProductiveHours: Number(row.ProductiveHours),
      }));

      employeesData.length = 0; // Clear previous
      employeesData.push(...loadedEmployees); // Fill new
    } catch (error) {
      console.error('Failed to load employees:', error);
    } finally {
      setLoading(false);
    }
  }, [sheetId]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  return { loading, employees: employeesData, refetch: fetchEmployees };
};
