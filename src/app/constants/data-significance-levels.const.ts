import { KeyValue } from "@shared/models";
import { DataSignificanceLevel } from "./data-significance-level.enum";

export const DataSignificanceLevels: KeyValue[] = [
  { key: DataSignificanceLevel.UZn1, value: 'Высокая: существенные негативные последствия или ваша организация не может выполнять функции (УЗ1 – уровень значимости)' },
  { key: DataSignificanceLevel.UZn2, value: 'Средняя: умеренные негативные последствия или ваша организация не может выполнять хотя бы одну функцию (УЗ2 – уровень значимости)' },
  { key: DataSignificanceLevel.UZn3, value: 'Низкая: незначительные негативные последствия или недостаточная эффективность выполнения (УЗ3 – уровень значимости)' },
]