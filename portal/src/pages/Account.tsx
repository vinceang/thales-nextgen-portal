import { useState } from "react";
import {
  Tabs,
  Card,
  Input,
  Select,
  DatePicker,
  TextArea,
  Toggle,
  RadioGroup,
  Checkbox,
  Button,
  Toast,
  ToastViewport,
} from "../design-system/components";
import { getAccountContent } from "../content/account";
import { useI18n } from "../i18n";
import s from "./Account.module.css";

const TOAST_MS = 4000;

// Sample defaults (no backend). Cancel restores these; Save fires a success Toast.
const DEFAULTS = {
  name: "Vincent Ang",
  country: "us",
  dob: null as Date | null,
  loyalty: "",
  notes: "",
  recon: true,
  captions: false,
  unit: "fahrenheit",
  news: true,
};

export default function Account() {
  const { t } = useI18n();
  const { tabs, countries, units } = getAccountContent(t);

  const [tab, setTab] = useState("profile");
  const [name, setName] = useState(DEFAULTS.name);
  const [country, setCountry] = useState(DEFAULTS.country);
  const [dob, setDob] = useState<Date | null>(DEFAULTS.dob);
  const [loyalty, setLoyalty] = useState(DEFAULTS.loyalty);
  const [notes, setNotes] = useState(DEFAULTS.notes);
  const [recon, setRecon] = useState(DEFAULTS.recon);
  const [captions, setCaptions] = useState(DEFAULTS.captions);
  const [unit, setUnit] = useState(DEFAULTS.unit);
  const [news, setNews] = useState(DEFAULTS.news);
  const [toast, setToast] = useState(false);

  function reset() {
    setName(DEFAULTS.name);
    setCountry(DEFAULTS.country);
    setDob(DEFAULTS.dob);
    setLoyalty(DEFAULTS.loyalty);
    setNotes(DEFAULTS.notes);
    setRecon(DEFAULTS.recon);
    setCaptions(DEFAULTS.captions);
    setUnit(DEFAULTS.unit);
    setNews(DEFAULTS.news);
  }

  function save() {
    setToast(true);
    window.setTimeout(() => setToast(false), TOAST_MS);
  }

  return (
    <div className={s.page}>
      <Tabs className={s.tabs} tabs={tabs} value={tab} onChange={setTab} />

      {tab === "profile" ? (
        <div className={s.content}>
          {/* Profile — text fields in a responsive two-column grid */}
          <Card title={t("account.profile.title")} subtitle={t("account.profile.subtitle")} padding={24}>
            <div className={s.fieldCol}>
              <div className={s.grid2}>
                <Input
                  label={t("account.profile.fullName")}
                  placeholder={t("account.profile.fullNamePlaceholder")}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Select
                  label={t("account.profile.country")}
                  placeholder={t("account.profile.countryPlaceholder")}
                  options={countries}
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <div className={s.grid2}>
                <DatePicker
                  label={t("account.profile.dob")}
                  placeholder={t("account.profile.dobPlaceholder")}
                  value={dob}
                  onChange={setDob}
                />
                <Input
                  label={t("account.profile.loyalty")}
                  placeholder={t("account.profile.loyaltyPlaceholder")}
                  value={loyalty}
                  onChange={(e) => setLoyalty(e.target.value)}
                />
              </div>
              <TextArea
                label={t("account.profile.notes")}
                placeholder={t("account.profile.notesPlaceholder")}
                rows={3}
                maxLength={160}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </Card>

          {/* Preferences — Toggle (instant), Radio (one-of-many), Checkbox (form-submitted) */}
          <Card title={t("account.preferences.title")} padding={24}>
            <div className={s.fieldCol}>
              <Toggle checked={recon} onChange={setRecon} label={t("account.preferences.autoReconnect")} />
              <Toggle checked={captions} onChange={setCaptions} label={t("account.preferences.captions")} />
              <div>
                <div className={s.sectionLabel}>{t("account.preferences.units")}</div>
                <RadioGroup name="units" value={unit} onChange={setUnit} options={units} />
              </div>
              <Checkbox checked={news} onChange={setNews}>
                {t("account.preferences.emailUpdates")}
              </Checkbox>
            </div>
          </Card>

          {/* Actions — right-aligned; Save fires the success Toast */}
          <div className={s.actions}>
            <Button variant="secondary" onClick={reset}>
              {t("account.cancel")}
            </Button>
            <Button onClick={save}>{t("account.save")}</Button>
          </div>
        </div>
      ) : (
        // Connectivity / Billing aren't specced in comp 03 yet — placeholder card.
        <div className={s.content}>
          <Card title={tabs.find((x) => x.value === tab)?.label} padding={24}>
            <p className={s.placeholder}>{t("account.comingSoon")}</p>
          </Card>
        </div>
      )}

      <ToastViewport placement="bottom-center">
        {toast && (
          <Toast tone="success" title={t("account.savedTitle")} onClose={() => setToast(false)}>
            {t("account.savedBody")}
          </Toast>
        )}
      </ToastViewport>
    </div>
  );
}
